build-backend:	
	docker build -t around-the-world -f dev.Dockerfile .

backend:
	docker run --rm -i -t \
	 -v $(pwd):/usr/src/backend \
	 -p 5000:5000 \
	 -w /usr/src/backend \
	 around-the-world

format:
	black ./*.py
