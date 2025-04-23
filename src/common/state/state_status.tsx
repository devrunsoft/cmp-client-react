export enum StateStatus {
   Initial, Success, Loading, Error, Empty, Retry
}

export class StateStatusExtension {
   constructor(private status: StateStatus) { }

   isSuccess(): boolean {
      return this.status === StateStatus.Success;
   }

   isError(): boolean {
      return this.status === StateStatus.Error;
   }

   isLoading(): boolean {
      return this.status === StateStatus.Loading;
   }

   // You can add more methods like isInitial, isRetry, etc.
   isInitial(): boolean {
      return this.status === StateStatus.Initial;
   }

   // Static method to instantiate from enum
   static from(status: StateStatus): StateStatusExtension {
      return new StateStatusExtension(status);
   }
}