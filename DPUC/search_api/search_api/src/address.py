class Address:

    def __init__(self, host: str, port: int):
        self.host = host
        self.port = port

    @property
    def http_url(self) -> str:
        return "http://" + self.host + ":" + str(self.port)
