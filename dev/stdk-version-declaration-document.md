# STDK Versioning Specification
Document ID: STDK-VS-1
Applies To: All STDK Projects
Scope: Internal cycle-based release control

------------------------------------------------------------

1. OVERVIEW

STDK Versioning is a finite-cycle, tier-classified version control model.

Version Format:

    CCC-TT-S

Where:
    CCC = Cycle Number (3 digits, zero-padded)
    TT  = Tier Declaration
    S   = Step Index (0–7)

Example:

    001-MJ-6


------------------------------------------------------------

2. COMPONENT DEFINITIONS

2.1 Cycle Number (CCC)

- Numeric, 3 digits, zero-padded (001, 002, 003, ...)
- Starts at 001
- Increments only after a completed release cycle
- No skipping unless explicitly declared internally
- No rollover within the same cycle

Example:
    001
    002


2.2 Tier Declaration (TT)

Defines the classification of change within a cycle.

Allowed Values:

    P   = Patch
          Bug fixes, balancing, small adjustments

    MN  = Minor
          Feature additions, non-structural systems,
          content extensions

    MJ  = Major
          Structural overhaul, major system integration,
          core mechanics changes

    R   = Release
          Cycle initialization or release threshold state


Optional (if ever required):

    RC  = Release Candidate
    HF  = Hotfix


Only declared tiers are valid.
No unofficial tags allowed.


2.3 Step Index (S)

- Integer range: 0–7
- Represents progression within a cycle
- Maximum value: 7
- No step 8 exists
- No negative values
- No duplicate step numbers within a cycle

Step 7 is the Release Threshold.


------------------------------------------------------------

3. PROGRESSION RULES

1. A new cycle begins at:

       CCC-R-0

2. Step number must strictly increase.
   - No backward stepping
   - No reuse of previous step numbers

3. Patch (P) may occur at any step.

4. Minor (MN) may occur at any step before release.

5. Major (MJ) typically occurs in later steps (recommended 4–6),
   but is not technically restricted.

6. Multiple MN or MJ declarations are allowed within a cycle.

7. When step 7 is reached, cycle closure is mandatory.


------------------------------------------------------------

4. RELEASE ENFORCEMENT RULE

When:

    CCC-*-7

is reached:

- The cycle is finalized.
- No further steps may be created in that cycle.
- The next version must increment the cycle number.
- Step resets to 0.

Transition example:

    001-R-7
    002-R-0

There is no overflow state.
There is no step 8.


------------------------------------------------------------

5. EXAMPLE FULL CYCLE

    001-R-0     Cycle initialization
    001-P-1     Patch
    001-MN-2    Minor addition
    001-P-3     Patch
    001-MJ-4    Major system update
    001-MN-5    Minor expansion
    001-MJ-6    Final structural update
    001-R-7     Release threshold

    002-R-0     New cycle begins


------------------------------------------------------------

6. PUBLIC VS INTERNAL DISPLAY

Public Display (marketing / players):

    Version 002

Internal / Developer Display:

    002-MJ-4


------------------------------------------------------------

7. DESIGN PRINCIPLES

STDK Versioning enforces:

- Structured progression
- Forced release cadence
- Finite iteration limits
- Controlled scope growth
- Clear internal state tracking

This system is intentionally:

- Non-semantic
- Non-industry-standard
- Internally consistent
- Mechanically structured


------------------------------------------------------------

8. IMMUTABILITY CLAUSE

Once a version identifier has been published,
it must never be altered retroactively.

Version identifiers are permanent historical markers.


------------------------------------------------------------

End of Specification.
