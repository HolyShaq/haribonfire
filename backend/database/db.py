from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Initialize the database engine
# database_url = "postgresql://localhost:5432/haribonfire-db"
database_url = "sqlite:///haribonfire.db"
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
