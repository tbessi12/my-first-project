import argparse


def greet(name: str, message: str = "Hello") -> str:
    return f"{message}, {name}!"


def main():
    parser = argparse.ArgumentParser(description="Greet a user by name")
    parser.add_argument("--name", required=True, help="Name to greet")
    parser.add_argument("--message", default="Hello", help="Custom greeting message")
    args = parser.parse_args()
    print(greet(args.name, args.message))


if __name__ == "__main__":
    main()
