from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

import search_api.es as es


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def search_dpuc(request):

    if request.method == "GET":
        conn = es.connect()
        if conn:
            docs = es.get_relevant_search(conn)
            print(f"docs: {docs}")
            return Response(docs, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
