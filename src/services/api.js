// Mock API Service
// Replace this with real PHP backend calls later

let posts = [
    {
        id: 1,
        title: "Welcome to my new Portfolio",
        summary: "This is the first post on my new 3D website.",
        content: "Content of the first post. It allows for *rich* text hopefully.",
        date: "2024-03-20",
        image: "/images/blog/post1.jpg"
    },
    {
        id: 2,
        title: "How I built this 3D site",
        summary: "A deep dive into Three.js and React Fiber.",
        content: "Here is how I used Three.js...",
        date: "2024-03-25",
        image: "/images/blog/post2.jpg"
    }
];

export const getPosts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...posts]), 500);
    });
};

export const getPost = async (id) => {
    return new Promise((resolve) => {
        const post = posts.find(p => p.id === parseInt(id));
        setTimeout(() => resolve(post), 500);
    });
};

export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "admin@example.com" && password === "password") {
                resolve({ token: "mock-token", user: { email } });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 800);
    });
};

export const savePost = async (post) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (post.id) {
                posts = posts.map(p => p.id === post.id ? { ...p, ...post } : p);
            } else {
                const newPost = { ...post, id: Date.now(), date: new Date().toISOString().split('T')[0] };
                posts.push(newPost);
            }
            resolve(true);
        }, 800);
    });
};

export const deletePost = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts = posts.filter(p => p.id !== id);
            resolve(true);
        }, 500);
    });
};
