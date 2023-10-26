from fastapi import FastAPI

app = FastAPI()

@app.get("/fastapi")
def read_root():
    return {"Hello": "World"}
