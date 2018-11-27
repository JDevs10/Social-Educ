<?php
// web/index.php
require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array (
            'driver'    => 'pdo_mysql',
            'host'      => '127.0.0.1',
            'dbname'    => 'Social',
            'user'      => 'root',
            'password'  => '',
            'charset'   => 'utf8mb4',
        
    )
));

/*$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello '.$app->escape($name);
});

$app->get('/hello/{name}', function ($name) use ($app) {
    return $app['twig']->render('hello.twig', array(
        'name' => $name,
    ));
});*/

/**/

//to get the last posts for the database
$app->get('/api/blog', function () use ($app) {
	 $posts = $app['db']->fetchAll('SELECT * FROM Posts ORDER BY id DESC');
    return json_encode($posts);
});

//modify a post on my wall
$app->post('/api/post/{id}', function (Request $request, $id) use($app) {
    $sql = "SELECT * FROM posts WHERE id = ?";
    $post = $app['db']->fetchAssoc($sql, array((int) $id));

    if ($request->get('title') != null){    $post['title'] = $request->get('title');}
    if ($request->get('body') != null){     $post['body'] = $request->get('body');}
    if ($request->get('author') != null){   $post['author'] = $request->get('author');}
    if ($request->get('picture') != null){  $post['picture'] = $request->get('picture');}

    $media = $post['media'] = ($request->get('media') != null) ? $request->get('media') : $post['media'];

    $sql = "UPDATE posts SET title=?, body=?, author=?, picture=?, media=? WHERE id = ?";
    $post = $app['db']->executeUpdate($sql, array(
        $post['title'],
        $post['body'],
        //$post['date'],
        $post['author'],
        $post['picture'],
        $media,
        (int) $id
    ));
    return json_encode($post);
});

//get a post
$app->get('/api/post/detail/{id}', function($id) use ($app) {
    $sql = $app['db']->fetchAssoc('SELECT * FROM Posts WHERE id = '.$id);
    return json_encode($sql);
});

//to insert a post on my wall
$app->post('api/post', function (Request $request) use($app){
    $title = $request->get('title');
    $body = $request->get('body');
    $autor = $request->get('author');
    $picture = $request->get('picture');
    $media = $request->get('media');

    $app['db']->insert('posts', $list = array(
        'title'         => $title,
        'body'          => $body,
        'author'         => $autor,
        'picture'       => $picture,
        'media'         => $media
    ));

    $lastID = $app['db']->lastInsertId();
    $sql = "SELECT * FROM posts WHERE id = ?"; //the id = ? --> is more secure in the url and it looks nicer
    $post = $app['db']->fetchAssoc($sql, array((int) $lastID));
    return json_encode($post);
});

//to delete a post on my wall
$app->get('api/blog/{id}/delete',  function ($id) use($app){
    $sql = "DELETE FROM posts WHERE id = ?";
    $post = $app['db']->executeQuery($sql, array((int) $id));
    return json_encode($post);
});

//to get all comments of a post
$app->get('/api/post/detail/{id}/comments', function($id) use ($app) {
    //$sql = $app['db']->fetchAll('SELECT * from comments WHERE idPost = '.$id.' ORDER BY id DESC ');
    $sql = "SELECT * FROM comments WHERE idPost = ? ORDER BY id DESC ";
    $comments = $app['db']->fetchAll($sql, array((int) $id));
    return json_encode($comments);
});

//to insert a comment to a post 
$app->post('/api/post/detail/{id}/addComment', function (Request $request, $id) use($app){
    $idPost = $request->get('idPost');
    $userName = $request->get('userName');
    $userPicture = $request->get('userPicture');
    $comment = $request->get('comment');

    $app['db']->insert('comments', $list = array(
        'idPost'        => $idPost,
        'userName'      => $userName,
        'userPicture'   => $userPicture,
        'comment'       => $comment
    ));

    $sql = "SELECT * FROM comments WHERE idPost = ? ORDER BY id DESC";
    $comment_post = $app['db']->fetchAll($sql, array((int) $id));

    return json_encode($comment_post);
});

//to insert the number of likes
$app->post('/api/post/detail/{id}/addLike', function (Request $request, $id) use ($app){
    $sql = "SELECT numberOfLikes FROM posts WHERE id = ?";
    $getAllLikes = $app['db']->fetchAssoc($sql, array((int) $id));

    $addLike = $getAllLikes['numberOfLikes']+1;

    $sql = "UPDATE posts SET numberOfLikes = ? WHERE id = ?";
    $app['db']->executeUpdate($sql, array(
        $addLike,
        (int) $id
    ));

    $sql1 = "SELECT * FROM posts WHERE id = ?";
    $post = $app['db']->fetchAssoc($sql1, array((int) $id));
    return json_encode($post);
});


//to get the total number of likes in a post
$app->get('/api/post/detail/{id}/numberLikes', function ($id) use ($app){
    $sql = "SELECT  numberOfLikes FROM posts WHERE id = ? ";
    $likes = $app['db']->executeQuery($sql, array((int) $id));

    return json_encode($likes);
});


//to get the total number of comments of in post
$app->get('/api/post/detail/{id}/numberComments', function ($id) use ($app){
    $sql = "SELECT COUNT(id) as nbComments FROM comments WHERE idPost = ?";
    $nbComments = $app['db']->fetchAssoc($sql, array((int) $id));

    $sql1 = "UPDATE posts SET numberOfComments = ? WHERE id = ?";
    $app['db']->executeUpdate($sql1, array(
        $nbComments['nbComments'],
        (int) $id
    ));

    $sql2 = "SELECT * FROM posts WHERE id = ?";
    $post = $app['db']->fetchAssoc($sql2, array((int) $id));
    return json_encode($post);
});

/*
$app->post('/api/post', function (Request $request) use ($app, $blogPosts) {
    $title = $request->get('title');
    $posts = $app['db']->fetchAll('SELECT * FROM Posts');

    return new Response('Thank you for your feedback! '.$title."\n\n".json_encode($posts));
});
*/

$app->run();