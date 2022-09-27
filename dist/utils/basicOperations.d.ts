export declare const BZERO: bigint;
export declare const BONE: bigint;
export declare class MathSol {
    /**
     * @dev Returns the addition of two unsigned integers of 256 bits, reverting on overflow.
     */
    /**
     * @dev Returns the addition of two signed integers, reverting on overflow.
     */
    static add(a: bigint, b: bigint): bigint;
    /**
     * @dev Returns the subtraction of two unsigned integers of 256 bits, reverting on overflow.
     */
    static sub(a: bigint, b: bigint): bigint;
    /**
     * @dev Returns the subtraction of two signed integers, reverting on overflow.
     */
    /**
     * @dev Returns the largest of two numbers of 256 bits.
     */
    static max(a: bigint, b: bigint): bigint;
    /**
     * @dev Returns the smallest of two numbers of 256 bits.
     */
    static min(a: bigint, b: bigint): bigint;
    static mul(a: bigint, b: bigint): bigint;
    static div(a: bigint, b: bigint, roundUp: boolean): bigint;
    static divDown(a: bigint, b: bigint): bigint;
    static divUp(a: bigint, b: bigint): bigint;
    static ONE: bigint;
    static MAX_POW_RELATIVE_ERROR: bigint;
    static mulUpFixed(a: bigint, b: bigint): bigint;
    static divDownFixed(a: bigint, b: bigint): bigint;
    static divUpFixed(a: bigint, b: bigint): bigint;
    static powUpFixed(x: bigint, y: bigint): bigint;
    static powDown(x: bigint, y: bigint): bigint;
    static complementFixed(x: bigint): bigint;
    static mulDownFixed(a: bigint, b: bigint): bigint;
}
