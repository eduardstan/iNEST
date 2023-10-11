from typing import Annotated
from fastapi import APIRouter
# from fastapi.encoders import jsonable_encoder

import os
import inspect
import pandas as pd

from sktime.registry import all_estimators
# from sktime.transformations import *
# from sktime.all import *
# from sktime.transformations.panel import *
# from sktime.transformations.panel.dictionary_based import *
# from sktime.transformations.panel.rocket import *
# from sktime.transformations.panel.signature_based import *
# from sktime.transformations.panel.summarize import *

from sktime.transformations.all import *
from sktime.transformations.compose._pipeline import TransformerPipeline
from .files import panel
# These are dependencies for the transformers in sktime
import statsmodels
import numba

router = APIRouter(
    prefix='/pipeline',
    tags=['pipeline'],
)

pipeline = []

@router.get('/list')
async def list_pipeline():
    return { 'data': pipeline }
  
# @router.get('/list/parameters')
def default_parameters(name: str):
    params = inspect.signature(eval(name).__init__).parameters
    param_keys = list(params.keys())
    
    pp = dict()
    
    for k in param_keys[1:]:
        pp[k] = params[k].default

    return pp

@router.get('/list/transformers')
async def list_transformers():
    # return {
    #     'data': all_estimators('transformer')[0][1]
    # }
    return { 'data': [ { 
        'name': t[0],
        'doc': t[1].__doc__,
        'tags': { tag: str(val) for tag, val in t[1]._tags.items() },
        'params': { 
            par: { 
                'value': str(val), 
                'type': str(type(val)) 
            } for par, val in default_parameters(t[0]).items() 
        }
        } for t in all_estimators('transformer')] }

# @router.get('/list/parameters')
# async def list_parameters(name: str):
#     params = inspect.signature(eval(name).__init__).parameters
#     param_keys = list(params.keys())
    
#     pp = dict()
    
#     for k in param_keys[1:]:
#         pp[k] = params[k].default
        
#     return { 'data' : pp }

@router.post('/add')
async def add_step(step: dict):
    pipeline.append(step)
    return { 'data': 'Step added.'}

@router.put('/moveupdown')
async def move_updown(step: dict):
    
    dir = step['dir']
    
    i = 0
    for (idx, tr) in enumerate(pipeline):
        if tr['id'] == step['transformer']['id']:
            i = idx
            t = tr
            break
    
    if dir == 'up':
        if i != 0:
            pipeline.remove(t)
            pipeline.insert(i-1, t)
    
    if dir == 'down':
        if i != len(pipeline):
            pipeline.remove(t)
            pipeline.insert(i+1, t)
    
    return {
        'data': f'Transformer moved.'
    }
    
@router.delete('/delete/{id}')
async def delete_file(id):
    for step in pipeline:
        if step['id'] == id:
            pipeline.remove(step)
            return {
                'data': f'Step with id={id} has been removed.'
            }
    return {
        'data': f'Step with id={id} not found.'
    }

dataset = pd.DataFrame()

@router.get('/dataset')
async def list_dataset():
    return {
        'data': dataset
    }
@router.get('/prestats')
async def pre_statistics():
    return {
        'data': f'Pre statistics computed'
    }
    
@router.get('/poststats')
async def post_statistics():
    df = panel.describe()
    
    return {
        'data': df.to_json()
    }
    
def convert_params_type(params):
    d = dict()
    # print('IN CONVERT:')
    # print(params)
    for p in params:
        if params[p]['type'] == "<class 'bool'>":
            if params[p]['value'] == 'True':
                d[str(p)] = True
            else:
                d[str(p)] = False
        elif params[p]['type'] == "<class 'int'>":
            d[str(p)] = int(params[p]['value'])
        elif params[p]['type'] == "<class 'float'>":
            d[str(p)] = float(params[p]['value'])
        elif params[p]['type'] == "<class 'NoneType'>":
            if params[p]['value'].isdigit():
                d[str(p)] = int(params[p]['value'])
            else:
                d[str(p)] = None
        else:
            d[str(p)] = params[p]['value']

                
    return d
        

@router.post('/run')
async def run():
    trs = []
    for step in pipeline:
        # Cl = globals()[step['name']]
        # transformer = Cl(**step['params'])
        
        # transformer = eval(step['name']).__init__(**step['params'])
        
        # transformer = globals()[step['name']](**step['params'])

        # print('IN RUN:')
        # print(step['params'])
        
        conv_params = convert_params_type(step['params'])
        
        # print(conv_params)
        
        # print(**conv_params)
        
        transformer = globals()[step['name']](**conv_params)
        
        print(transformer)
        
        # pipe.append(transformer)
        # if pipe == None:
        #     pipe = transformer
        # else:
        #     pipe = pipe * transformer
        trs.append(transformer)
        
        # print(trs)
    pipe = TransformerPipeline(steps = trs) 
    print(pipe)
    pipe.fit_transform(panel)
    print(panel.head())
    return {
        'data': 'Pipeline run ended.' # TransformerPipeline(steps = [globals()['PAA']()])
    }