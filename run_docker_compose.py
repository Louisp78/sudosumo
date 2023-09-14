import argparse
import os
import subprocess
import platform
import sys


def run_docker_compose(compose_file, build, envFilePath):
    try:
        docker_compose_cmd = ["docker-compose", "-f", compose_file, ]

        if envFilePath and os.path.isfile(envFilePath):
            print(f"Loading environment variables from {envFilePath}")
            docker_compose_cmd.append("--env-file")
            docker_compose_cmd.append(envFilePath)

        docker_compose_cmd.append("up")
        docker_compose_cmd.append("-d")

        if build:
            docker_compose_cmd.append("--build")

        if platform.system() == "Windows":
            subprocess.run(docker_compose_cmd, check=True)
        else:
            subprocess.run(docker_compose_cmd, check=True)
        print(f"Docker Compose for {compose_file} started successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        print(f"Failed to start Docker Compose for {compose_file}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run Docker Compose with build option and load environment variables from a .env file.")
    parser.add_argument("--build", action="store_true", help="Build images before starting services")
    parser.add_argument("--env-file", help="Path to a .env file to load environment variables")
    parser.add_argument("--only-front", action="store_true", help="Only start the frontend")
    parser.add_argument("--only-back", action="store_true", help="Only start the backend")

    args = parser.parse_args()

    compose_file1 = "docs/docker-compose.yml"
    compose_file2 = "sudosumo_backend/docker-compose.yml"

    # Specify the path to your docker-compose.yml files
    if args.only_front:
        run_docker_compose(compose_file1, args.build, args.env_file)
        sys.exit(0)
    elif args.only_back:
        run_docker_compose(compose_file2, args.build, args.env_file)
        sys.exit(0)

    run_docker_compose(compose_file1, args.build, args.env_file)
    run_docker_compose(compose_file2, args.build, args.env_file)
