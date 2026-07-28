class ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;

  constructor(message: string, data: T = null as T) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;