import numpy as np
import h5py
train_name = 'train.hdf5'
tr_name = 'train1.hdf5'
test_name = 'test.hdf5'
te_name = 'test1.hdf5'

with h5py.File(train_name, 'r') as f1, h5py.File(tr_name, 'w') as f2:
    f2.create_dataset('X', f1['X'].shape)
    f2['X'][:10000] = np.array(f1['X'][:10000], dtype=float) / 255
    f2['X'][10000:] = np.array(f1['X'][10000:], dtype=float) / 255
    
    f2.create_dataset('y', f1['y'].shape, data=f1['y'])

with h5py.File(test_name, 'r') as f1, h5py.File(te_name, 'w') as f2:
    X = np.array(f1['X'], dtype=float) / 255
    f2.create_dataset('X', X.shape, data=X)
    
    f2.create_dataset('y', f1['y'].shape, data=f1['y'])