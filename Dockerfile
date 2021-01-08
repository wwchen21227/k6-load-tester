FROM loadimpact/k6:0.29.0

ENV SCRIPT sample.js

WORKDIR /tests

COPY ./src /tests

# Override the entry point of the base k6 image
ENTRYPOINT []
CMD ["sh", "-c", "k6 run $SCRIPT"]