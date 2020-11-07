import numpy as np
import argparse
import h5py
from sklearn.model_selection import train_test_split

data_name = 'data.hdf5'
train_name = 'train.hdf5'
test_name = 'test.hdf5'

with h5py.File(data_name, 'r') as data:
    X, y = data['X'][:], data['y'][:]
    X_train, X_test, y_train, y_test = train_test_split(X, y)
    with h5py.File(train_name, 'w') as train:
        train.create_dataset('X', X_train.shape)
        train['X'][:10000] = np.array(X_train[:10000], dtype=float) / 255
        train['X'][10000:] = np.array(X_train[10000:], dtype=float) / 255
    
        train.create_dataset('y', y_train.shape, data=y_train)

    with h5py.File(test_name, 'w') as test:
        _X = np.array(X_test, dtype=float) / 255
        test.create_dataset('X', _X.shape, data=_X)
        
        test.create_dataset('y', y_test.shape, data=y_test)