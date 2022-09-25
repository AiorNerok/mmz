from fastapi import APIRouter, Depends, HTTPException, status

from models.post import Post, PostIn
from models.users import User
from repositories.posts import PostRepo
from repositories.logs import LogsRepo
from endpoints.depends import get_current_user, get_logs_repo, get_post_repo

router = APIRouter()


@router.get('/', response_model=list[Post])
async def get_posts(
        posts: PostRepo = Depends(get_post_repo),
        limit: int = 100,
        skip: int = 0,
        current_user: User = Depends(get_current_user),
        logs: LogsRepo = Depends(get_logs_repo),
):
    log_v = {
        'description': 'get all post',
        'methods': 'GET',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await posts.get_all(limit, skip)


@router.get('/filter', response_model=list[Post])
async def get_posts_filter(
        filter: str,
        posts: PostRepo = Depends(get_post_repo),
        current_user: User = Depends(get_current_user),
        logs: LogsRepo = Depends(get_logs_repo),
):
    log_v = {
        'description': f'get post< filter{filter}',
        'methods': 'GET',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await posts.get_all_filter(filter=filter)


@router.get('/my', response_model=list[Post])
async def get_posts_authors(
        posts: PostRepo = Depends(get_post_repo),
        current_user: User = Depends(get_current_user),
        logs: LogsRepo = Depends(get_logs_repo),
):

    log_v = {
        'description': 'get all post',
        'methods': 'GET',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await posts.get_all_by_user_id(id=current_user.id)


@router.post('/', response_model=Post)
async def create_post(
        post: PostIn,
        posts: PostRepo = Depends(get_post_repo),
        current_user: User = Depends(get_current_user),
        logs: LogsRepo = Depends(get_logs_repo),
):

    log_v = {
        'description': 'create new post',
        'methods': 'POST',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await posts.create(user_id=current_user.id, p=post)


@router.put('/', response_model=Post)
async def update_post(
        id: int,
        p: PostIn,
        posts: PostRepo = Depends(get_post_repo),
        current_user: User = Depends(get_current_user),
        logs: LogsRepo = Depends(get_logs_repo),
):

    old_post = await posts.get_by_id(id)
    if old_post is None and old_post.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='post not found')

    log_v = {
        'description': 'update post',
        'methods': 'POST',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return await posts.update(id, current_user.id, p)


@router.delete('/')
async def delete_post(
        id: int,
        posts: PostRepo = Depends(get_post_repo),
        current_user: User = Depends(get_current_user),
        logs: LogsRepo = Depends(get_logs_repo),
) -> bool:

    post = await posts.get_by_id(id)

    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='post not found')

    exp = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail='post not found')

    if post is None and post.id != current_user.id: raise exp

    result = await posts.delete(id)
    if result is None: raise exp

    log_v = {
        'description': 'Delete post',
        'methods': 'DELETE',
        'user_id': current_user.id,
        'username': current_user.username
    }

    await logs.create(v=log_v)

    return {"status": True}
