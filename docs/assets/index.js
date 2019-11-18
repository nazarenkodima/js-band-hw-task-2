function getTruckIdsCallback(callback) {
  setTimeout(() => {
      callback([1,2,5,9,67]);
  }, 1000)  
}

function getTruckIds() {
  return new Promise((resolve => {
      getTruckIdsCallback(result => {
        resolve(result)
      });
  }));

}

function getTruckByIdCallback(id, callback) {
  setTimeout(() => {
      const isError = Math.ceil(Math.random()*1000) < 100;
      if (isError) {
          return callback(undefined, "Internal error"); 
      }
      callback({
          id: id,
          model: `truck ${id}`
      });
  })  
}


function getTruckById(id) {
  return new Promise((resolve,reject) => {
    getTruckByIdCallback(id, result => {
     if (result) {
      resolve(result)
     } else {
      reject('Can\'t fetch truck')
     }
    });
}).
catch(err => console.log(err))  
}



function getTruckListCallback(callback) {

  


}


function getTruckListPromise() {
    return new Promise(((resolve, reject) => {
      getTruckIds()
      .then(idArray => {
        return Promise.all(idArray.map(id => getTruckById(id)))
      })
      .then(list => list.filter(truck => truck !== undefined))
      .then((resolvedValue) => {
        resolve(resolvedValue)
      },
      (rejectionReason) => {
        reject(rejectionReason)
      })

    }))
}

getTruckListPromise()
  .then(list => {
    console.log(list)
    return list;
  })


async function getTruckListAsynAwait() {
  const idArray = await getTruckIds();

  const truckList = await Promise.all(idArray.map(id => getTruckById(id)));

  const result = truckList.filter(truck => truck !== undefined);

  console.log(result)
  return result;
}

getTruckListAsynAwait()
