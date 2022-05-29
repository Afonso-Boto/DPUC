from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

from .config import es_connector
from .log import get_logger

logger = get_logger("search_api.views")


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def search_dpuc(request):

    if request.method == "GET":
        keywords = request.GET.get('keywords', '')
        try:
            docs = es_connector.get_relevant_search(keywords)
            return Response(docs, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(e.args)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def update(request):

    if request.method == "GET":
        try:
            es_connector.update()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(e.args)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
