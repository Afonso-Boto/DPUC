import logging
from logging import Logger

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)-12s %(levelname)-8s %(message)s",
    datefmt="%m-%d %H:%M:%S",
)


def get_logger(module) -> Logger:
    return logging.getLogger(module)
