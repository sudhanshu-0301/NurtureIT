
# NurtureIt

This project takes plant leaf images as input and can classify the disease of the plant.
It uses a custom made CNN Model trained on a Dataset consisting of 9 varieties of plants and their various diseases. The models are saved and used by a Backend Built using Flask. It has UI built with HTML, CSS, Bootstrap. Combined togeter it serves a full stack web app.
 


## Features

CNN and Model training:
 - Improved the speed of processing by using prefetch and caching 
 - Achieved test accuracy of 99%
 - Utilised Tensorflow to build custom architecture for good results
 - Instead of training one big large model, trained 9 individual models for the 9      plants for improved accuracy in predictions
Backend Features:
 - Utilised Flask to define an API which deploys our trained consisting
 - API Features facility to handle and send predictions as response 
 - API serves the HTML pages which make up the UI.
 - Implemented Google API client to provide top 5 search results and recommendations
   based on the predicted disease
 - Improved the response time of the API by designing it in a way to run only the required model according the name of plant recieved from the user.
 Frontend Features:
 - Responsive UI even on Phones
 - Built functionality to obtain images uploaded by user and provide to Backend for processing and display the obtained results dynamically
 - Minimalistic Design policy providing for a cleaner,non-cluttered and  user friendly Interface
 - Built a panel to integrate with the Google Client API.
 - Designed and integrated the multiple required pages.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Archit0123/NurtureIt.git
```

Go to the project directory

```bash
  cd nurtureit
```

Install dependencies

```bash
  pip install -r requirements
```

Start the server

```bash
  flask run
```

Get the dataset at:

```bash
    https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset
```
## Tech Stack

**Client:** HTML,CSS,JavaScript

**Server:** Python,Flask

**Deep Learning:** Python,Tensorflow,Jupyter Notebook

