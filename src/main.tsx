import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './components/Router.tsx';
import './index.css';
import {RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ReactDom from 'react-dom/client';
import App from './App.tsx'
import PaymentPolicy from './components/PaymentPolicy';
import RefundPolicy from './components/RefundPolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import BlogPage from './components/BlogPage.tsx';
// import Home from './components/Home'
import IndividualBlog from './components/IndividualBlog.tsx';
import { PostHogProvider } from 'posthog-js/react'
import Hero from './components/Hero.tsx';
import Blog from './components/Blog.tsx';
import Contact from './components/Contact.tsx';
import Features from './components/Features.tsx';
import Testimonials from './components/Testimonials.tsx';
import Pricing from './components/Pricing.tsx';
import FAQ from './components/FAQ.tsx';
import Home from './components/Home.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import SignupForm from './components/SignupForm.tsx';
import EmployerForm from './components/EmployerForm.tsx';
import EmployerPage from './components/EmployerPage.tsx';
import CampaignManager from './components/CampaignManager.tsx';
import ProtectedCampaignManager from './components/ProtectedCampaignManager.tsx';

const routes=createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path : '/', index: true, element: <Home /> },                 // <-- this
      {path : '/home', element : <Home />},
      { path: 'paymentpolicy', element: <PaymentPolicy /> },
      { path: 'refundpolicy', element: <RefundPolicy /> },
      { path: 'privacypolicy', element: <PrivacyPolicy /> },
      { path: 'termsofservice', element: <TermsOfService /> },
      { path: 'blogs', element: <BlogPage /> },
      { path: '/signup', element : <Home /> },
      { path: '/get-a-demo', element : <Home /> },
      { path: '/get-started-now', element : <Home /> },
      { path: '/testimonials', element : <Home /> },
      { path : '/employers', element : <Home />},
      { path : '/faq', element: <Home />},
      {path : '/pricing', element : <Home />},
      {path : '/features', element : <Home />},
      {path : '/book-free-demo', element : <Home />}
    ],
  },
  // Standalone blog reader pages (no navigation, no footer - clean reading experience)
  {
    path: '/blog/:slug',
    element: <IndividualBlog />
  },
  {
    path: '/blogs/:id',
    element: <IndividualBlog /> 
  },
  {
    path: '/employer-registration',
    element: <EmployerPage />
  },
  {
    path: '/campaign',
    // Gate access behind password prompt inside ProtectedCampaignManager
    element: <ProtectedCampaignManager />
  }

]);

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: true,
  capture_pageview: true,
  capture_pageleave: true,
  person_profiles: 'identified_only' as const,
  // Enable heatmaps for click tracking and visual analytics
  enable_heatmaps: true,
  // Enable session recording for user behavior analysis
  session_recording: {
    maskAllInputs: false, // Set to true if you want to mask sensitive input fields
    recordCrossOriginIframes: false,
    recordCanvas: false, // Set to true if you have canvas elements
  },
  // Enhanced tracking options
  capture_performance: true,
  capture_console_logs: false, // Set to true for debugging
  // Feature flags for A/B testing
  bootstrap: {
    featureFlags: {}
  }
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
    {/* <Router /> */}
    {/* <ScrollToHash> */}
    <RouterProvider router={routes} />
    {/* </ScrollToHash> */}
    </PostHogProvider>
  </StrictMode>
);
