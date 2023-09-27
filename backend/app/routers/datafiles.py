from typing import Annotated
from fastapi import APIRouter, File, Form, HTTPException

import os
import pandas as pd

router = APIRouter(
    prefix="/datafiles",
    tags=["datafiles"],
)

panel = pd.DataFrame()

files = {
    "path": "/home/edu/Dropbox/Work/Bolzano/Durst/Data/testdata",
    "names": [
        "printer_unordered_574.csv",
        "printer_unordered_565.csv"
  ]
}

def build_panel(path: str, files: list[str], freq: str='M', pivot_aggfn: str='mean'): # , resample_aggfn='mean'):
    # panel = pd.DataFrame()
    
    for (i, file) in enumerate(files):
        df = pd.read_csv(f'{path}/{file}')
        dfp = df.pivot_table(index=['printer_id', 'time'], columns='sensor_id', values='signal_value', aggfunc=pivot_aggfn)
        dfp.index = dfp.index.set_levels([dfp.index.levels[0], pd.to_datetime(dfp.index.levels[1], utc=True)])
        dfr = dfp.resample(freq, level='time').mean()
        dfr.set_index(pd.MultiIndex.from_product([[f'{ i }'], dfr.index.values], names=["printer_id", "time"]), inplace=True)
        panel = pd.concat([panel, dfr])

    return panel

@router.get('/')
async def read_root():
    return {'message': 'Welcome'}

@router.get('/files')
async def read_files():
    return files

@router.post("/dirfiles")
async def files_in_directory(dp: Annotated[str, Form()]):
    files["path"] = dp
    files["names"] = os.listdir(dp)
    return files
    
@router.post("/panelfiles")
async def panel_files():
    panel = build_panel(path=files["path"], files=files["names"])
    idx = panel.index.levels[0]
    
    shapes = dict([(k, panel.xs(k, level=0, axis=0, drop_level=False).shape) for k in idx])
    return {
        "numinstance": len(panel.index.levels[0]),
        "shapes": shapes
    }

# TODO
# @router.get("/{instance_id}")
# async def read_instance(instance_id: int):
#     if instance_id not in data["data"]:
#         raise HTTPException(
#             status_code=404,
#             detail=f"Instance (id={instance_id}) not found"
#         )
#     desc = data["data"][instance_id]
#     return {
#         "id": instance_id,
#         "value": desc,
#     }