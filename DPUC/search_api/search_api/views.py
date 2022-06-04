from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
import traceback

from .src.es import ElasticSearchConnector
from .src.log import get_logger

logger = get_logger("search_api.views")
es = ElasticSearchConnector()


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def search_dpuc(request):

    logger.info(f"GET /search from {request}")

    if request.method == "GET":
        keywords = request.GET.get('keywords', '')
        try:
            docs = es.search(keywords)
            return Response(docs, status=status.HTTP_200_OK)
        except Exception:
            logger.error(traceback.format_exc())
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def update(request):

    logger.info(f"GET /update from {request}")

    if request.method == "GET":
        try:
            es.update()
            return Response(status=status.HTTP_200_OK)
        except Exception:
            logger.error(traceback.format_exc())
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
