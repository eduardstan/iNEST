from typing import Annotated
from fastapi import APIRouter, File, Form, HTTPException

import os
import pandas as pd

router = APIRouter(
    prefix='/files',
    tags=['files'],
)

files = [
    {
        'id': '55397165-6c85-c654-d781-61f655a35b39',
        'path': '/home/edu/Dropbox/Work/Bolzano/Durst/Data/testdata/printer_unordered_574.csv'
    },
    {
        'id': '41362c27-8f3b-d3cd-9ddf-b84c78be491e',
        'path': '/home/edu/Dropbox/Work/Bolzano/Durst/Data/testdata/printer_unordered_565.csv'
    }
]

@router.post('/add')
async def add_file(file: dict):
    files.append(file)
    return { 'data': 'File added.'}

@router.get('/list')
async def list_files():
    return { 'data': files }

@router.delete('/delete/{id}')
async def delete_file(id):
    for file in files:
        if file['id'] == id:
            files.remove(file)
            return {
                'data': f'File with id={id} has been removed.'
            }
    return {
        'data': f'File with id={id} not found.'
    }

panel = pd.DataFrame()

def build_panel(files: list[str], freq: str='M', pivot_aggfn: str='mean'): # , resample_aggfn='mean'):
    processed = pd.DataFrame()
    
    for (i, file) in enumerate(files):
        path = file['path']
        df = pd.read_csv(path)
        dfp = df.pivot_table(index=['printer_id', 'time'], columns='sensor_id', values='signal_value', aggfunc=pivot_aggfn)
        dfp.index = dfp.index.set_levels([dfp.index.levels[0], pd.to_datetime(dfp.index.levels[1], utc=True)])
        dfr = dfp.resample(freq, level='time').mean()
        dfr.set_index(pd.MultiIndex.from_product([[f'{ i }'], dfr.index.values], names=["printer_id", "time"]), inplace=True)
        processed = pd.concat([processed, dfr])

    return processed

@router.post("/process/")
async def panel_files(): # (freq: str): # , pivot_aggfn: str='mean'):
    panel = build_panel(files=files, freq='Y', pivot_aggfn='mean')
    idx = panel.index.levels[0]
    
    shapes = dict([(k, panel.xs(k, level=0, axis=0, drop_level=False).shape) for k in idx])
    return {
        "numinstance": len(panel.index.levels[0]),
        "shapes": shapes
    }