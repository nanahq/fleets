interface UnitSuffixProps {
    value?: number;
    units: Record<number, string>;
    noSuffixSpacing?: boolean;
    prefix?: string;
}

export function UnitSuffix(props: UnitSuffixProps): JSX.Element {
    if (props.value === undefined) {
        return <span>...</span>;
    }

    const value = props.value;
    const exponent = Math.floor(Math.log10(Math.abs(value)) / 3);
    const scaledValue = value / Math.pow(1000, exponent);
    const suffix = props.units[exponent * 3] ?? "";
    const formattedSuffix =
        props.noSuffixSpacing !== undefined && props.noSuffixSpacing
            ? suffix
            : ` ${suffix}`;

    return (
        <>
            {props.prefix && props.prefix}
            {props.value < 1 ? 0 : scaledValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {formattedSuffix}
        </>
    );
}
