
class Address:

    def __init__(self, host: str, port: int):
        self._host = host
        self.port = port

    @property
    def host(self):
        return self._host

    @property
    def http_url(self) -> str:
        return "http://" + self._host + ":" + str(self.port)
