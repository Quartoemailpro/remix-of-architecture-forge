# Module Dependencies

## Dependency Rules
- Domain layer: ZERO external dependencies
- Application layer: Depends only on domain + shared ports
- Infra layer: Implements ports, may use external libraries
- Modules communicate ONLY via events or shared interfaces

## Inter-Module Flow
```
blockchain-monitor  ──event──►  deposit-saga
deposit-saga        ──event──►  liquidity-pool
deposit-saga        ──event──►  address-generator
deposit-saga        ──event──►  payment-scheduler
deposit-saga        ──event──►  log-minimizer
```

## Forbidden Dependencies
- No module imports another module's domain entities directly
- No domain file imports infra or framework code
- No circular dependencies between modules
