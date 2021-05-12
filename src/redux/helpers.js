
export const arrayToArityMap = (symbols) => {
  let arityMap = new Map();
  for (let x of symbols) {
    if (!arityMap.has(x.name)) {
      arityMap.set(x.name, x.arity);
    }
  }
  return arityMap;
}

export const parseLanguageSubset = (input, parser) => {
  try {
    let result = parser(input);
    return {
      array: result,
      error: null
    };
  } catch (error) {
    return {
      array: [],
      error: error
    };
  }
}

const checkArity = (symbol, args, arityMap, {expected}) => {
  const a = arityMap.get(symbol);
  if (args.length !== a) {
    expected(`${a} argument${(a === 1 ? '' : 's')} to ${symbol}`);
  }
}

export const parseFormalization = (input, constants, predicates, functions, parser) => {
  const nonLogicalSymbols = new Set([
    ...constants,
    ...predicates.keys(),
    ...functions.keys()
  ]);

  const language = {
    isConstant: (x) => constants.has(x),
    isPredicate: (x) => predicates.has(x),
    isFunction: (x) => functions.has(x),
    isVariable: (x) => !nonLogicalSymbols.has(x)
  };

  const factories = {
    variable: () => null,
    constant: () => null,
    functionApplication: (symbol, args, ee) => {
      checkArity(symbol, args, functions, ee);
      return null;
    },
    predicateAtom: (symbol, args, ee) => {
      checkArity(symbol, args, predicates, ee);
      return null;
    },
    equalityAtom: () => null,
    negation: () => null,
    conjunction: () => null,
    disjunction: () => null,
    implication: () => null,
    equivalence: () => null,
    existentialQuant: () => null,
    universalQuant: () => null
  };

  try {
    parser(input, language, factories);
    return null;
  } catch (error) {
    return error;
  }
}
