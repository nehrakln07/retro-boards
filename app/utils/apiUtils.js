const LocalStorageAPI = {
    get: (key) => {
      return new Promise((resolve, reject) => {
        try {
          const serializedData = localStorage.getItem(key);
          if (serializedData === null) {
            reject('Data not found');
          }
          const data = JSON.parse(serializedData);
          resolve(data);
        } catch (error) {
          reject('Error retrieving data from local storage');
        }
      });
    },
    update: (key, newValue) => {
      return new Promise((resolve, reject) => {
        try {
          localStorage.setItem(key, JSON.stringify(newValue));
          resolve('Data updated successfully');
        } catch (error) {
          reject('Error updating data in local storage');
        }
      });
    },
    remove: (key) => {
      return new Promise((resolve, reject) => {
        try {
          localStorage.removeItem(key);
          resolve('Data deleted successfully');
        } catch (error) {
          reject('Error removing data from local storage');
        }
      });
    }
  };
  
  export default LocalStorageAPI;
  