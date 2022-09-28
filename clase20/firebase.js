//const admin = require("firebase-admin");
//import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = {
    "credential": cert({ "type": "service_account",
    "project_id": "coderhouse-backend-73e4d",
    "private_key_id": "067b4b76decbd2132ebfe0f258391254c84863f9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDL2GcNoULBOKo8\nGkIa3fCFTn8uCna1gXLCqGNlKGmmNd90jtXR1wyZ6ieg+qhttgbEfMY4RqJTgjQ7\nJyJ1onLdm4neLbLvVS5OUeLeGaLCMbP7VdHl/TzZvrfPNS/I37sheOvBJuo5th79\nO/bd7CAh2VUlr3u1rxUP0e8ktjKncDTxVOVvnErJGrAlU/x1t0WlpKC0nlqP4iqV\njI6AAFLSn/iKA0OV1PWvNveSo40EEZfIlCp6oAa0Be28lQNlwItfiuF8+bXyGNgS\nO4JqXsUZfDU94+pyfAYlxyeN8dqiBLSDVxtCGXZgCOKeod8oyTC6zSIlNEarj5P/\n5jfuoGw7AgMBAAECggEAAc9sKtzRwPGF4X7CM4bhCe4Ghxwkrbv2ju/74fwX5Bf6\nYgiasYBdZkiEDZPsRv0k1j3dbMaDzoYLfLL+RVkp9/nXoZd6TVHOVXe4sgw8O8lB\nNewvLwGutqhQ7ZAlWn1SJhvyzAZScizB3bHYoWPlbSeG8Ay85oIlh7xviT3s+Tur\nzeo326Xa9IMp6B53I+pK91I2mQAAd7IYIexRtgWnOOp3abjiCIF36rXH6PXWMPc0\nDDxdHL6HB+egZ2r9geKaD5PGYgKzslbVY491lst1uvh7/nM+z7od/MNtH5zSm/nv\n5pXYh1tsBV9J7Z2VtJdh/azgEZF1s1cEWcaq6iA88QKBgQDngDfeiAfj9eX034uG\n0LX8KWJReUBz+Xwd4q0RpFPtTuBESt883vQkONuRCjnubK8LitOaG9IfufMhOMVC\nyuAq6IBwd3qhAZlLalaoIm8QciYnB0fY7IEmI9cqB5+u4dnBu4hi6GGjjEEMnKHE\nAH1/9/v7hkbYYhlaKj8PXvBmvQKBgQDhavIFND3sYatPYcVENmi0+0zm5AKkvb03\nzC+0IXOL+OOgz0kVDxHlnhPeuqsXo/enwmjg0VO4KUoV882V/jzFjfxiKRaF902G\nUxE2ilWF1r8ywC5td371nQbptrrCtkAdqD+28Q1uMHSR3waQFVfAIXJA0Ud8AsSo\nVMPitsSqVwKBgGHxJjH43VW9wCeEuFQ2Uvg3TghoQzON1swSDeTL4FIjL9DU2HO5\nZBM7FvHbIL1VsA0zE+k8Yf7YPhvNF+/1QzgEG+r5MaGSupdkivshblnH4YpbkzMc\nhFttiGeYyB9GIEnNnJsz87Ms8Ix0bCAvkOkmMq6slaaQgmdaPkmzggQFAoGBAL6+\nYE1HB58ehneFpAc0gyWiAFDgX9xHMfYlMbibFcs7sGJDBPRs7BgAy4+NJXm7pbSv\nLVAP0WfkiGxLAYwKtiH1I7tsSULTISao48fjBrtaHDA1rxOyKhxr442gsihRT6/I\nzyFemJ7FId7NeiAx7y8FHkj6ziKBtSc7kwYk4gXBAoGBAKDzBb4Hmw2hB+PNvRnT\nmcQj0bMdOxiZo7b7Lmyx93h/dPDJ1K+k98YpxOHh0G0eu7TKhovYi1YQ9/IyySaw\nnBhw7VsDjLVcXk3dfO/ca6fONpQMV1TxCCcG04p3AeuSY0cuhTJqD45PK4OA5WVM\nzExXzd5xjIw+IJ1e9Cg6qule\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-81i2s@coderhouse-backend-73e4d.iam.gserviceaccount.com",
    "client_id": "103003216969714362351",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-81i2s%40coderhouse-backend-73e4d.iam.gserviceaccount.com"})
   
  };

const app = initializeApp(serviceAccount);

console.log('Firebase connected');

CRUD();

async function CRUD() {
    const db = getFirestore();
    const query = db.collection('usuarios');

    try {
        // let id = 1;
        // let doc = query.doc(`${id}`);
        // await doc.create({nombre: 'Jose', dni: 11223344});
        // id++;
        // doc = query.doc(`${id}`);
        // await doc.create({nombre: 'Ana', dni: 22334455});
        // id++;
        // doc = query.doc(`${id}`);
        // await doc.create({nombre: 'Diego', dni: 33445566});
        // console.log('Datos insertados');
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            dni: doc.data().dni
        }));
        console.log(response);

        let queryId = 2;
        const doc = query.doc(`${queryId}`);
        const item = await doc.get();
        const respuesta = item.data();
        console.log(respuesta);
        

    } catch (err) {
        console.log(err);
    }
}
