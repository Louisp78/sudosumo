import subprocess
import platform

def run_docker_compose(compose_file):
    try:
        if platform.system() == "Windows":
            subprocess.run(["docker-compose.exe", "-f", compose_file, "up", "-d"], check=True)
        else:
            subprocess.run(["docker-compose", "-f", compose_file, "up", "-d"], check=True)
        print(f"Docker Compose for {compose_file} started successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        print(f"Failed to start Docker Compose for {compose_file}.")

if __name__ == "__main__":
    # Specify the path to your docker-compose.yml files
    compose_file1 = "docs/docker-compose.yml"
    compose_file2 = "sudosumo_backend/docker-compose.yml"

    run_docker_compose(compose_file1)
    run_docker_compose(compose_file2)
