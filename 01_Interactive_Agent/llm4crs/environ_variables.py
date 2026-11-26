# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

import os
import json

_domain = os.environ.get('DOMAIN', 'game')
__filepath = os.path.dirname(__file__)
__domain_resource_dir = os.path.abspath(os.path.join(__filepath, f'../resources/{_domain}'))
UNIREC_DIR = os.path.abspath(os.path.join(__filepath, '../UniRec/'))

_settings_path = os.path.join(__domain_resource_dir, 'settings.json')
if os.path.exists(_settings_path):
    with open(_settings_path, encoding='utf-8') as f:
        environ = json.load(f)
else:
    environ = {
        'GAME_INFO_FILE': 'items.csv',
        'TABLE_COL_DESC_FILE': 'col_desc.json',
        'MODEL_CKPT_FILE': 'model.ckpt',
        'ITEM_SIM_FILE': 'item_sim.pkl',
        'USE_COLS': ['title', 'price'],
        'CATEGORICAL_COLS': []
    }

GAME_INFO_FILE = os.path.abspath(os.path.join(__domain_resource_dir, environ['GAME_INFO_FILE']))
TABLE_COL_DESC_FILE = os.path.abspath(os.path.join(__domain_resource_dir, environ['TABLE_COL_DESC_FILE']))
MODEL_CKPT_FILE = os.path.abspath(os.path.join(__domain_resource_dir, environ['MODEL_CKPT_FILE']))
ITEM_SIM_FILE = os.path.abspath(os.path.join(__domain_resource_dir, environ['ITEM_SIM_FILE']))
USE_COLS = environ['USE_COLS']
CATEGORICAL_COLS = environ['CATEGORICAL_COLS']

__all__ = ['UNIREC_DIR', 'GAME_INFO_FILE', 'TABLE_COL_DESC_FILE', 'MODEL_CKPT_FILE', 'ITEM_SIM_FILE', 'USE_COLS', 'CATEGORICAL_COLS']