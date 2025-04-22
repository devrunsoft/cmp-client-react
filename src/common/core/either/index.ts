export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B {
    return onLeft(this.value);
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
  fold<B>(_onLeft: (l: L) => B, onRight: (a: A) => B): B {
    return onRight(this.value);
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left<L, A>(l);
};

export const right = <L, A>(a: A): Either<L, A> => {

  return new Right<L, A>(a);
};

// interface CusomerError extends Error {
// }
// export declare var CusomerError: CustomeErrorConstructor;
// // interface CustomeErrorConstructor {
// //   new(message?: string): CusomerError;
// //   (message?: string): CusomerError;
// // }

// interface CustomeErrorConstructor extends ErrorConstructor {
//   new(message?: string): CusomerError;
//   (message?: string): EvalError;
//   readonly prototype: EvalError;
// }

export class CusomerError extends Error {
  constructor(message?: string) {
    super(message??"");
    this.name = "CustomerError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnAuthorize extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnAuthorize";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}