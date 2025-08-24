export interface ITestResult {
  source: string;
  translation: string;
  progress: number;
}

export interface ITestResultUI extends ITestResult {
  progressDelta: number;
}
