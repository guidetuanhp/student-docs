"use client";

import { createContext, useContext } from "react";

export interface GeneratedCourseData {
  code: string;
  name: string;
  credits: number;
  instructor?: string;
  schedule?: string;
  room?: string;
  faculty?: string;
}

export interface GeneratedFeeData {
  item: string;
  amount: number;
}

export interface GeneratedAnnouncementData {
  title: string;
  date: string;
  desc: string;
}

export interface GeneratedTranscriptCourse {
  code: string;
  name: string;
  credits: number;
  grade: string;
  points: number;
}

export interface GeneratedSemesterRecord {
  name: string;
  courses: GeneratedTranscriptCourse[];
  semesterGpa: number;
}

export interface GeneratedTranscriptData {
  semesters: GeneratedSemesterRecord[];
  cumulativeGpa: number;
}

export interface GeneratedData {
  courses: GeneratedCourseData[];
  fees: GeneratedFeeData[];
  announcements: GeneratedAnnouncementData[];
  transcript: GeneratedTranscriptData | null;
  signatureUrl: string;
}

const defaultGenerated: GeneratedData = {
  courses: [],
  fees: [],
  announcements: [],
  transcript: null,
  signatureUrl: "",
};

const GeneratedDataContext = createContext<GeneratedData>(defaultGenerated);

export const GeneratedDataProvider = GeneratedDataContext.Provider;
export const useGeneratedData = () => useContext(GeneratedDataContext);
