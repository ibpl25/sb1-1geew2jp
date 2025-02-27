<?php
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get and decode JSON data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validate required fields
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        throw new Exception('Missing required fields');
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags($data['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Set up email
    $to = 'ilbelpaeselinguistics@gmail.com';
    $subject = "New Contact Form Message from $name";
    
    // Set up headers
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'From: ' . $email;
    $headers[] = 'Reply-To: ' . $email;
    
    // Create HTML message
    $htmlMessage = "
        <html>
        <head>
            <title>New Contact Form Message</title>
        </head>
        <body>
            <h2>New Contact Form Message</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <br>
            <p><strong>Message:</strong></p>
            <p>" . nl2br($message) . "</p>
        </body>
        </html>
    ";
    
    // Send email
    $sent = mail($to, $subject, $htmlMessage, implode("\r\n", $headers));
    
    if (!$sent) {
        throw new Exception('Failed to send email');
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}