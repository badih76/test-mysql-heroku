const express = require('express');

// import clients from './routers/clients';
// import maintPR from './routers/maintenance/poolreadings';
const projects = require('./projects');
// import contracts from './routers/contracts';
// import users from './routers/users';
// import sites from './routers/sites';
// import migrateRouter from './routers/migrate/migrate';


// import { send } from 'process';

const app = express();
const port = process.env.PORT || 3000;

// app.use('/clients', clients);
// app.use('/maintenance/poolreadings', maintPR);
app.use('/projects', projects);
// app.use('/contracts', contracts);
// app.use('/users', users);
// app.use('/sites', sites);
// app.use('/migrate', migrateRouter);


app.get('/', (req, res) => {
    // console.log('in function');
    // var db = getFirestore(firebaseApp);
    // const hdCollection = collection(db, 'Inventory/Assets/Clients');

    // getDocs(hdCollection)
    //     .then(snapshot => {
    //         // console.log(snapshot.docs);
    //         let docs = [];
    //         snapshot.docs.forEach(d => {
    //             console.log(d);
    //             docs.push({...d.data(), id: d.id});
    //         });
    //         // console.log(docs);
    //         res.send(docs);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.send(err);
    //     });
    res.send('Welcome to Experts SM FMS API');
});


app.listen(port, () => {
    console.log(`Experts SM FMS API listening on port ${port}`)
  })