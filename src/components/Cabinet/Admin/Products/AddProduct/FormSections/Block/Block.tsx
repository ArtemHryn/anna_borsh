export interface BlockProps {
  blockNumber: number;
}

const Block = ({ blockNumber }: BlockProps) => {
  return <div data-block-number={blockNumber}>{blockNumber}</div>;
};

export default Block;
