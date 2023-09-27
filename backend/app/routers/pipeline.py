from typing import Annotated
from fastapi import APIRouter
# from fastapi.encoders import jsonable_encoder

import os
import pandas as pd

from sktime.registry import all_estimators

router = APIRouter(
    prefix='/pipeline',
    tags=['pipeline'],
)

pipeline = []

@router.get('/list')
async def list_pipeline():
    return { 'data': pipeline }
  
@router.get('/list/transformers')
async def list_transformers():
    # return {
    #     'data': all_estimators('transformer')[0][1]
    # }
    return { 'data': [ { 
        'name': t[0],
        'doc': t[1].__doc__,
        'tags': { tag: str(value) for tag, value in t[1]._tags.items() }
        } for t in all_estimators('transformer')] }


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