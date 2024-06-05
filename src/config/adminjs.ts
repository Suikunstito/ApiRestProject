import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import mongoose from 'mongoose';
import AdminJSMongoose from '@adminjs/mongoose';
import express from 'express';

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminRouter, adminJs };
