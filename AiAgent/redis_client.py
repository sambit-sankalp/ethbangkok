import redis


def get_redis_client():
    return redis.StrictRedis(
        host="redis-18080.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
        port=18080,
        password="1gl9OLhuAlU7bmOARsBi4dVYnCIGu0vz",
        decode_responses=True,
    )
