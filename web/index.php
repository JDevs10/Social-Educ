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


// Student profile api's
//get all the experience posts from student
$app->get('/api/student/{id}/experience', function ($id) use ($app){
    $sql = 'SELECT * FROM experience where IdStudent = ?';
    $experience = $app['db']->fetchAll($sql,  array((int) $id));

    return json_encode($experience);
});

//add a experience post from a student
$app->post('/api/student/{id}/experience/addExperience', function (Request $request, $id) use ($app){
    $IdStudent = $request->get('IdStudent');
    $title = $request->get('Title');
    $companyName = $request->get('CompanyName');
    $companyAddress = $request->get('CompanyAddress');
    $companyWebSite = $request->get('CompanyWebSite');
    $period = $request->get('Period');
    $description = $request->get('Description');

    $app['db']->insert('experience', $list = array(
        'IdStudent'         => $IdStudent,
        'Title'             => $title,
        'CompanyName'       => $companyName,
        'CompanyAddress'    => $companyAddress,
        'CompanyWebSite'    => $companyWebSite,
        'Period'            => $period,
        'Description'       => $description
    ));

    $sql = "SELECT * FROM experience WHERE IdStudent = ?";
    $experience_post = $app['db']->fetchAll($sql, array((int) $id));

    return json_encode($experience_post);
});

//get all the education posts from student
$app->get('/api/student/{id}/education', function ($id) use ($app){
    $sql = 'SELECT * FROM education where IdStudent = ?';
    $education = $app['db']->fetchAll($sql,  array((int) $id));

    return json_encode($education);
});

//add a education post from a student
$app->post('/api/student/{id}/education/addEducation', function (Request $request, $id) use ($app){
    $IdStudent = $request->get('IdStudent');
    $schoolName = $request->get('SchoolName');
    $diploma = $request->get('Diploma');
    $fieldOfStudy = $request->get('FieldOfStudy');
    $diplomaLevel = $request->get('DiplomaLevel');
    $period = $request->get('Period');
    $description = $request->get('Description');

    $app['db']->insert('education', $list = array(
        'IdStudent'     => $IdStudent,
        'SchoolName'    => $schoolName,
        'Diploma'       => $diploma,
        'FieldOfStudy'  => $fieldOfStudy,
        'DiplomaLevel'  => $diplomaLevel,
        'Period'        => $period,
        'Description'   => $description
    ));

    $sql = "SELECT * FROM education WHERE IdStudent = ?";
    $education_post = $app['db']->fetchAll($sql, array((int) $id));

    return json_encode($education_post);
});

//get all the skill posts from student
$app->get('/api/student/{id}/skill', function ($id) use ($app){
    $sql = 'SELECT * FROM skills where IdStudent = ?';
    $skill = $app['db']->fetchAll($sql,  array((int) $id));

    return json_encode($skill);
});

//add a skill post from a student
$app->post('/api/student/{id}/skill/addSkill', function (Request $request, $id) use ($app){
    $IdStudent = $request->get('IdStudent');
    $skillName = $request->get('SkillName');

    $app['db']->insert('skills', $list = array(
        'IdStudent'     => $IdStudent,
        'SkillName'    => $skillName
    ));

    $sql = "SELECT * FROM skills WHERE IdStudent = ?";
    $education_post = $app['db']->fetchAll($sql, array((int) $id));

    return json_encode($education_post);
});

//remove a skill post from s student
$app->get('/api/student/{id1}/skill/{id2}/delete',  function ($id1,$id2) use($app){
    $sql = "DELETE FROM skills WHERE id = ?";
    $post = $app['db']->executeQuery($sql, array((int) $id2));

    $sql = "SELECT * FROM skills WHERE IdStudent = ?";
    $get_the_remaining_skills = $app['db']->fetchAll($sql, array((int) $id1));
    return json_encode($get_the_remaining_skills);
});

$app->run();