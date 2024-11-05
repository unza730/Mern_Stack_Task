React & Frontend
1. Explain the difference between controlled and uncontrolled components in React. Provide examples of when to use each.

Controlled Components are components in which state is managed by React itself, typically using hooks like useState. In contrast, Uncontrolled Components manage their own state with the help of DOM.
Certainly! Here are examples of both controlled and uncontrolled components in React to help illustrate the difference:

### 1. Controlled Component Example

In a controlled component, the input’s value is stored in a React state variable, and any changes to the input update this state. React is fully in charge of the input’s state.

```javascript
import React, { useState } from 'react';

function ControlledComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h3>Controlled Component</h3>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Current Value: {inputValue}</p>
    </div>
  );
}

export default ControlledComponent;
```


### 2. Uncontrolled Component Example

In an uncontrolled component, the input's state is managed directly by the DOM. To access the input’s value, you use a `ref` to get the input element and retrieve its value when needed.

```javascript
import React, { useRef } from 'react';

function UncontrolledComponent() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    alert(`Entered Value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <h3>Uncontrolled Component</h3>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UncontrolledComponent;
```

1. What is the purpose of React.memo()? How does it differ from useMemo()?

React.memo() is used to memoize the component itself and useMemo() is used to memoize the computed values within themselve.
Example:
We're building dashboard for a sales team that has two main parts:
  1) Selected Filter Component
  2) Sales Summary Component 

   - Selected Filter Component does not depend on any complex calculations but it does depend on a prop like selected filter options so whenever prop change then component should render, for this purpose we can achieve this functionality using React.memo() which prevents unnecessary rerendering of the component. 
 
 - The Sales Summary component shows important numbers like total sales and total profits based on some filtered data. When we have to do complex calculations, the component can re-render often, which means it will recalculate these numbers every time. This can be a waste of time and resources. To avoid this, we can use the useMemo() hook. With useMemo(), we only recalculate the values when the dependencies change. This way, we don’t redo the calculations on every re-render, making our component work faster.
1. Describe the React component lifecycle methods and their equivalent hooks.
   we have following lifecycle methods which is use in class components:
   - ComponentDidMount
   - ComponentDidUpdate
   - ComponentWillUnmount


- # componentDidMount: 
  This lifecycle method is used when we want to perform an action right after the component is rendered for the first time. In functional components, we can achieve this behavior with the useEffect hook by passing an empty dependency array ([]). For example, if we want to fetch post data whenever the Post component renders initially, we can write:

   ```javascript
   useEffect(() => {
     fetchPostData();
   }, []);
   ```

  By passing an empty array, useEffect will only run once, just like componentDidMount in class components.

- # componentDidUpdate:
  This method is used when we want to perform an action every time a specific piece of state or a prop changes. In functional components, we can achieve this by adding dependencies to the dependency array in useEffect. For example, if a user searches for a specific post and we want to display only that post whenever the search state changes, we can use:

   ```javascript
   useEffect(() => {
     displaySpecificPost();
   }, [searchTerm]);
   ```

  Here, useEffect will run whenever the searchTerm state changes, similar to componentDidUpdate in class components.



4. How would you optimize the performance of a React application? List at least three techniques.
 Here are three common techniques to optimize the performance of a React application:

1. Use React.memo and useMemo
React.memo: Wraps functional components to prevent unnecessary re-renders. If a component’s props don’t change, React.memo skips re-rendering it.
useMemo: Caches the result of expensive calculations within a component. If dependencies haven’t changed, useMemo returns the previously computed value instead of recalculating.
2. Code Splitting and Lazy Loading
Code Splitting: Breaks up large bundles into smaller chunks that are loaded only when needed. This reduces the initial load time of the application.
Lazy Loading: Uses React.lazy and Suspense to load components only when they are actually needed, improving initial render times

3. Optimize Rendering with Keys:
Ensure that lists of elements use unique keys. This helps React identify which items have changed, are added, or are removed. Using stable, unique keys prevents unnecessary re-renders and improves the efficiency of list rendering.

```javascript

const items = data.map(item => <ListItem key={item.id} item={item} />);
```
### Node.js & Express
1. Explain middleware in Express.js and provide an example of custom middleware.
   Middleware functions run during the request-response cycle in Express.js. These functions have access to the request and response objects, allowing them to perform actions between receiving a request from the client and sending a response back to the client.

For example, if we want to check if a user is authorized to perform a certain action, we can use middleware to handle this. Let's say we want to restrict access to a dashboard based on user roles. In this case, if a user is a buyer, they should not be allowed to access the admin dashboard. The middleware would first check if the user has an admin role, and if they do, it would grant access to the dashboard. If not, it would deny access.
```javascript
// Middleware function to check user role
function authorizeAdmin(req, res, next) {
   const user = req.user;

  // Check if the user has an admin role
  if (user && user.role === 'admin') {
    next(); 
  } else {
    return res.status(403).send('Access denied. You do not have permission to access this dashboard.');
  }
}

module.exports = authorizeAdmin; 

// Example route for the admin dashboard
app.get('/admin/dashboard', authorizeAdmin, (req, res) => {
  res.send('Welcome to the admin dashboard!');
});

```
2. What are streams in Node.js? When would you use them?
   Stream is a powerful way to handle all reading and wrting data in a efficient flow. Streams are used to handle large amounts of data which are not available all at once such as files, network connections, or even the output from external processes. Streams are allow to split data in chunks which helps manage memory usage and improve performance.

  # Types OF Streams:
   1) Readable Stream: This type of stream is allow to read data from a source in a sequential manner.
   Examples: fs.createReadStream() for reading files, HTTP requests, and other data sources.

   2) Writeable Stream: This type of stream is allow to write data to a destination
   Examples: fs.createWriteStream() for writing to files, HTTP responses, etc.

   3) Duplex Streams: This streams can both read and write data. They are a combination of readable and writable streams.
    Example: TCP sockets in network programming.

 Example of Using Streams
Here’s a simple example demonstrating how to use readable and writable streams in Node.js to read from a file and write to another file:

```javascript

const fs = require('fs');

const readableStream = fs.createReadStream('input.txt');

const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);

writableStream.on('finish', () => {
  console.log('Data has been successfully written to output.txt');
});
```
3. How do you handle errors in Express.js? Describe the error handling middleware pattern.
The error handling middleware pattern in Express.js is a structured way to manage errors that occur during the request-response cycle. This pattern is important for ensuring that our applications are robust and can gracefully handle unexpected situations.

Key Features of the Error Handling Middleware Pattern:

# Error Handling Middleware Definition:

In Express, we define an error handling middleware function with four parameters: err, req, res, and next. The presence of the err parameter indicates to Express that this is specifically an error handling middleware.
```javascript
app.use((err, req, res, next) => {
  // Handle the error
});
```
# Passing Errors to Middleware:

Whenever an error occurs in any middleware or route handler, we can pass it to the error handling middleware by calling the next() function with the error as an argument. This skips the rest of the middleware and sends control directly to our error handler.
```javascript
app.use((req, res, next) => {
  // Simulating an error
  const error = new Error('Something went wrong!');
  next(error); // Pass the error to the error handling middleware
});
```

# Responding to Errors:

Inside the error handling middleware, we typically log the error for debugging purposes and send a meaningful HTTP response back to the client. This response usually includes an appropriate status code, such as 400 for client errors or 500 for server errors, along with a JSON object containing the error message.
```javascript

app.use((err, req, res, next) => {
  console.error(err.message); // Log the error
  const statusCode = err.status || 500; // Use custom status code or default to 500
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
    },
  });
});

```

### MongoDB
1. Explain the aggregation pipeline in MongoDB. Provide an example.
   The aggregation pipeline in MongoDB is a way to process and analyze data from collections. It uses a series of steps (called stages) to transform documents, such as filtering, grouping, and calculating totals. Each step takes the output from the previous step to create a final result.
   # Example:
   For instance, if you have a collection of sales records, you can use the aggregation pipeline to calculate the total revenue from each item sold.
  - $match: Filters documents based on criteria.
  - $group: Groups documents by a specified field and performs aggregations.
  - $sort: Sorts the documents.
  - $project: Reshapes documents by including or excluding fields
  
  # Example:
  ```javascript
  db.sales.aggregate([
  {
    $group: {
      _id: "$item",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  }
]);
```
This pipeline calculates total revenue for each item and sorts them in descending order.

2. What are indexes in MongoDB? How do they improve query performance?
 Indexes in MongoDB are special data structures that enhance the speed of data retrieval operations on a collection. They allow the database to quickly locate documents without scanning the entire collection.

Faster Retrieval: Indexes reduce the time it takes to find documents by allowing MongoDB to use a sorted structure rather than performing a full collection scan.
Efficient Sorting: When a query includes sorting, indexes help return sorted results without additional processing.
Reduced Resource Usage: By minimizing the number of documents scanned, indexes lower CPU and I/O usage, improving overall performance.
Example:
For a users collection with an email field that is frequently queried, creating an index on that field allows fast lookups:

```javascript

db.users.createIndex({ email: 1 });
```
In summary, indexes significantly improve query performance by speeding up data access and reducing resource consumption.
1. Describe the difference between embedding and referencing in MongoDB document design.

When designing documents in MongoDB, the choice between embedding and referencing depends on the nature of the data and how it will be accessed. Here’s a breakdown of both approaches:

1. Embedding
Definition: Embedding involves nesting related data directly within a single document. This means that the related information is stored together in one document structure.

Use Cases:

Best used when the related data is often accessed together. For example, if you have a blog application, you might embed comments directly within the blog post document since comments are typically retrieved alongside the post.
Advantages:

Performance: Accessing a single document with all its related data can be faster since it reduces the need for multiple queries.
Atomicity: Updates to the embedded data are atomic because they occur within the same document, ensuring consistency.
Disadvantages:

Document Size Limit: MongoDB has a document size limit of 16 MB, so embedding too much data can lead to exceeding this limit.
Data Duplication: If the embedded data is large or shared among multiple documents, it may lead to data duplication, increasing storage requirements.
Example of Embedding:
```json

{
  "_id": "post1",
  "title": "My First Blog Post",
  "content": "This is the content of the blog post.",
  "comments": [
    { "user": "Alice", "comment": "Great post!", "date": "2024-11-01" },
    { "user": "Bob", "comment": "Thanks for sharing!", "date": "2024-11-02" }
  ]
}
```
1. Referencing
Definition: Referencing involves storing the relationships between documents by including references (usually the ObjectId) to other documents rather than embedding the data directly.

Use Cases:

Ideal when the related data is large, frequently updated, or needs to be accessed independently. For instance, in a social media application, users may have many posts, and it may be better to reference user data in each post rather than embedding all user details.
Advantages:

Reduced Duplication: This approach minimizes data duplication, as referenced documents can be stored separately and updated independently.
Scalability: More scalable for large datasets, as you can manage relationships without hitting document size limits.
Disadvantages:

Complexity: Querying requires additional lookups and can be more complex, which may impact performance.
Consistency: Maintaining consistency across referenced documents requires careful handling, especially when data is updated or deleted.
Example of Referencing:
```json
// Post Document
{
  "_id": "post1",
  "title": "My First Blog Post",
  "content": "This is the content of the blog post.",
  "userId": "user1" // Reference to User document
}

// User Document
{
  "_id": "user1",
  "username": "Alice",
  "email": "alice@example.com"
}
```
Summary
In summary, embedding is suitable for related data that is frequently accessed together, promoting performance and atomicity, while referencing is more appropriate for large or independently managed data, reducing duplication and allowing for easier scalability. The choice between the two depends on the specific requirements of the application and how the data is structured and accessed.

