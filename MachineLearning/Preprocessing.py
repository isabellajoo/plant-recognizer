import numpy as np
import argparse
import h5py
from sklearn.model_selection import train_test_split
from tqdm import tqdm

data_name = 'data.hdf5'
train_name = 'train.hdf5'
test_name = 'test.hdf5'

size_of_iter = 5000

with h5py.File(data_name, 'r') as data:
    X, y = data['X'][:], data['y'][:]
    X_train, X_test, y_train, y_test = train_test_split(X, y)
    with h5py.File(train_name, 'w') as train:
        train.create_dataset('X', X_train.shape)
        size = X_train.shape[0]
        for i in tqdm(range(size//size_of_iter)):
            train['X'][size_of_iter*i:size_of_iter*(i + 1)] = np.array(X_train[size_of_iter*i:size_of_iter*(i + 1)], dtype=float) / 255

        train.create_dataset('y', y_train.shape, data=y_train)

    with h5py.File(test_name, 'w') as test:
        test.create_dataset('X', X_test.shape)
        size = X_test.shape[0]
        for i in range(size//size_of_iter):
            test['X'][size_of_iter*i:size_of_iter*(i + 1)] = np.array(X_test[size_of_iter*i:size_of_iter*(i + 1)], dtype=float) / 255
        
        test.create_dataset('y', y_test.shape, data=y_test)