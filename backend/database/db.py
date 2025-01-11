import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
from logs import logger

# Initialize the database engine
load_dotenv("./../.env")
database_url = str(os.getenv("DATABASE_URL"))
engine = create_engine(database_url)

# Define a session dependency
Session = sessionmaker(engine)


def get_database_session():
    with Session() as session:
        yield session
        session.commit()


# Define a base class for declarative models
Base = declarative_base()


# Function to initialize the database
def initialize_database():
    Base.metadata.create_all(engine)
    logger.info("Database created!")
