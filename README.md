# React + TypeScript + Vite

> Demo: https://lgacc.z1.web.core.windows.net/

This template should help get you started developing with React, TypeScript and Vite in no time.

## Get started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` and you're ready to go!

## Building and running in production mode

To build the application for production, use the build command. A production build will be placed in `dist` folder.

```bash
az group create --name labyrint-generator --location norwayeast
az group list --output table
az storage account create --name lgacc --resource-group labyrint-generator --location norwayeast --sku Standard_LRS 
az storage blob service-properties update --account-name lgacc --static-website --index-document index.html
az storage container list --account-name lgacc --output table
npm run build
az storage blob upload-batch --destination '$web' --type block --pattern '**' --account-name 'lgacc' --source dist
az storage blob delete-batch --source '$web' --account-name 'lgacc'
az storage account show --name lgacc --query "primaryEndpoints.web" --output tsv
