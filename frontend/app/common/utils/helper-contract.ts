type ModelConstructor<T> = new (data: unknown) => T;

type FetchFunction<TData = unknown, TParams = void> = TParams extends void
    ? () => Promise<TData>
    : (params: TParams) => Promise<TData>;

export const createContract = async <T, TParams = void>(
    fetchFunction: FetchFunction<unknown, TParams>,
    ModelClass: ModelConstructor<T>,
    ...[params]: TParams extends void ? [] : [TParams]
): Promise<T | null> => {
    try {
        const rawData = params !== undefined
            ? await (fetchFunction as (p: TParams) => Promise<unknown>)(params)
            : await (fetchFunction as () => Promise<unknown>)();
        return new ModelClass(rawData);
    } catch (error) {
        console.error("Error creating data contract:", error);
        return null;
    }
};

export const createArrayContract = async <T, TParams = void>(
    fetchFunction: FetchFunction<unknown[], TParams>,
    ModelClass: ModelConstructor<T>,
    ...[params]: TParams extends void ? [] : [TParams]
): Promise<T[]> => {
    try {
        const rawData = params !== undefined
            ? await (fetchFunction as (p: TParams) => Promise<unknown[]>)(params)
            : await (fetchFunction as () => Promise<unknown[]>)();

        if (!Array.isArray(rawData)) {
            console.error("Expected array data, received:", typeof rawData);
            return [];
        }

        return rawData.map((item: unknown) => new ModelClass(item));
    } catch (error) {
        console.error("Error creating array data contract:", error);
        return [];
    }
};