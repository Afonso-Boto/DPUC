from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from django.http.request import HttpRequest

from .core import ElasticSearchConnector, ElasticsearchUnreachable

es = ElasticSearchConnector()

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def search_dpuc(request):

    if request.method == "GET":
        keywords = request.GET.get('keywords', '')
        try:
            docs = es.get_relevant_search(keywords)
            return Response(docs, status=status.HTTP_200_OK)
        except ElasticsearchUnreachable:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def update(request):

    if request.method == "GET":
        es.update()
        return Response(status=status.HTTP_200_OK)
