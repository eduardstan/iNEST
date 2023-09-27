from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from typing import Annotated

from .routers import files
from .routers import pipeline

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(files.router)
app.include_router(pipeline.router)

# @app.post("/uploadfiles/")
# async def create_upload_files(files: list[UploadFile]):
#     return {
#         "filenames": [file.file for file in files]
#         }

# @app.post("/files/")
# async def create_file(
#     # file: Annotated[bytes, File()],
#     fileb: Annotated[UploadFile, File()],
#     # token: Annotated[str, Form()],
# ):
#     return {
#         "path": fileb.name,
#         # "file_size": len(file),
#         # "token": token,
#         "fileb_content_type": fileb.content_type,
#     }

# @app.get("/")
# async def main():
#     content = """
# <body>
# <form action="/uploadfiles/" enctype="multipart/form-data" method="post">
# <input name="files" type="file" multiple>
# <input type="submit">
# </form>
# </body>
#     """
#     return HTMLResponse(content=content)

