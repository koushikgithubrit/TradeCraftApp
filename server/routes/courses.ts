import express from 'express';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    // Return static course data since we removed database
    const courses = [
      {
        id: '1',
        title: 'Introduction to Stock Market',
        description: 'Learn the fundamentals of stock market trading.',
        level: 'Beginner',
        duration: '8 weeks',
        lessons: 24,
        price: 0, // Free
      },
      {
        id: '2', 
        title: 'Technical Analysis Mastery',
        description: 'Master technical analysis techniques.',
        level: 'Intermediate', 
        duration: '10 weeks',
        lessons: 32,
        price: 0, // Free
      },
      {
        id: '3',
        title: 'Advanced Trading Strategies', 
        description: 'Learn advanced trading strategies.',
        level: 'Advanced',
        duration: '12 weeks',
        lessons: 36, 
        price: 0, // Free
      }
    ];
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Return static course data based on ID
    const course = {
      id,
      title: 'Introduction to Stock Market',
      description: 'Learn the fundamentals of stock market trading.',
      level: 'Beginner',
      duration: '8 weeks',
      lessons: 24,
      price: 0,
    };
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Enroll in a course (now public)
router.post('/enroll', async (req, res) => {
  try {
    const { courseTitle } = req.body;
    
    // Since we're using localStorage now, just return success
    const courseData = {
      title: courseTitle,
      progress: 0,
      completedTopics: []
    };

    res.json({ 
      message: 'Successfully enrolled in course',
      course: courseData
    });
  } catch (error: any) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: error.message || 'Error enrolling in course' });
  }
});

// Update course progress (now public)
router.post('/progress', async (req, res) => {
  try {
    const { courseTitle, progress, completedTopic } = req.body;
    
    // Since we're using localStorage now, just return success
    res.json({ 
      message: 'Progress updated successfully',
      course: {
        title: courseTitle,
        progress: progress || 0,
        completedTopics: completedTopic ? [completedTopic] : []
      }
    });
  } catch (error: any) {
    console.error('Progress update error:', error);
    res.status(500).json({ message: error.message || 'Error updating progress' });
  }
});

// Get user's course progress (now public)
router.get('/progress', async (req, res) => {
  try {
    const { courseTitle } = req.query;
    
    // Since we're using localStorage now, return default data
    if (courseTitle) {
      res.json({
        title: courseTitle,
        progress: 0,
        completedTopics: []
      });
    } else {
      res.json([]);
    }
  } catch (error: any) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: error.message || 'Error fetching progress' });
  }
});

export default router; 