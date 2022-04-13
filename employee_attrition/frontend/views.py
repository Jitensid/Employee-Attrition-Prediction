import os

from catboost import CatBoostClassifier
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render

from frontend.models import *

model = CatBoostClassifier()
model.load_model(
    fname=os.path.join(settings.BASE_DIR, "frontend/models/Without_Hyper.h5"),
    format="cbm",
)


# Create your views here.
def index(request):
    return render(request, "frontend/index.html")


def make_prediction(request):

    model_params = list()

    NUMBER_OF_MODEL_PARAMETERS = 30

    if request.method == "GET":

        for param_index in range(NUMBER_OF_MODEL_PARAMETERS):

            model_param = request.GET[str(param_index)]

            if model_param.isnumeric():
                model_param = int(model_param)

            model_params.append(model_param)


    return JsonResponse({"Score": int(model.predict(model_params))})

