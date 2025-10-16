import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modules } from '../data/modules';

interface EnrolledCourse {
  courseId: string;
  enrollDate: string;
  title: string;
}

const COURSE_TITLE = "Beginner to Pro Trader";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [readPages, setReadPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  // Get user progress from localStorage
  const loadUserProgress = () => {
    try {
      // Get progress from local storage
      const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      
      // Calculate total PDFs/lessons from modules
      const totalPDFs = modules.reduce((sum, m) => sum + m.lessons.length, 0);
      setTotalPages(totalPDFs); // This represents total PDFs, not pages
      
      // Calculate completed PDFs (lessons where all pages are read)
      let completedPDFs = 0;
      modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          const lessonProgress = progress[lesson.id];
          if (lessonProgress && lessonProgress.totalPages > 0) {
            const readPages = lessonProgress.readPages?.length || 0;
            const totalPages = lessonProgress.totalPages;
            // PDF is considered complete if all pages are read
            if (readPages >= totalPages) {
              completedPDFs++;
            }
          }
        });
      });
      
      setReadPages(completedPDFs);
      
      // Calculate percentage: each PDF completion = 5% (assuming 20 PDFs)
      // But use actual total for calculation to be flexible
      const percentage = totalPDFs > 0 ? Math.round((completedPDFs / totalPDFs) * 100) : 0;
      setProgressPercent(percentage);
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
      // Set defaults
      const totalPDFs = modules.reduce((sum, m) => sum + m.lessons.length, 0);
      setTotalPages(totalPDFs);
      setReadPages(0);
      setProgressPercent(0);
    }
  };

  const loadEnrolledCourses = () => {
    try {
      const enrolledCourseIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      const courseData = [
        { id: '1', title: 'Introduction to Stock Market' },
        { id: '2', title: 'Technical Analysis Mastery' },
        { id: '3', title: 'Advanced Trading Strategies' }
      ];
      
      const enrolled = enrolledCourseIds.map((courseId: string) => {
        const course = courseData.find(c => c.id === courseId);
        return {
          courseId,
          enrollDate: new Date().toISOString(), // You could store this when enrolling
          title: course?.title || 'Unknown Course'
        };
      });
      
      setEnrolledCourses(enrolled);
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
      setEnrolledCourses([]);
    }
  };

  useEffect(() => {
    loadUserProgress();
    loadEnrolledCourses();
    setLoading(false);
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{COURSE_TITLE}</h3>
            <p className="text-gray-400 mb-4">Track your real progress across all modules and lessons.</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-300 mb-2">
              PDFs completed: {readPages} / {totalPages}
            </div>
            <button
              onClick={() => navigate('/trading-course')}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Continue Learning
            </button>
          </motion.div>

          {/* Enrolled Courses */}
          {enrolledCourses.map((course) => (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-400 mb-4">
                Enrolled on {new Date(course.enrollDate).toLocaleDateString()}
              </p>
              <div className="text-sm text-gray-300 mb-4">
                Status: <span className="text-emerald-400">Active</span>
              </div>
              <button
                onClick={() => navigate('/trading-course')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Continue Learning
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 